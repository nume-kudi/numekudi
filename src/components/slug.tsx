import { useRef, useEffect, useState } from "react";

type Point = {
  x: number;
  y: number;
};

type Slug = {
  body: Point[];
  x: number;
  y: number;
  dx: number;
  dy: number;
  targetX: number;
  targetY: number;
};

const BODY_LENGTH = 120;
const ANTENNA_LENGTH = 15;
const MAX_TURN_ANGLE = Math.PI / 30;
const INITIAL_X = 100;
const INITIAL_Y = 100;
const TARGET_HITBOX_WH = 100;

const limitTurnAngle = (
  dx: number,
  dy: number,
  newDx: number,
  newDy: number
) => {
  const currentAngle = Math.atan2(dy, dx);
  const newAngle = Math.atan2(newDy, newDx);
  let angleDiff = newAngle - currentAngle;

  if (angleDiff > Math.PI) {
    angleDiff -= 2 * Math.PI;
  } else if (angleDiff < -Math.PI) {
    angleDiff += 2 * Math.PI;
  }

  if (Math.abs(angleDiff) > MAX_TURN_ANGLE) {
    const clampedAngle =
      currentAngle + (angleDiff > 0 ? MAX_TURN_ANGLE : -MAX_TURN_ANGLE);
    return {
      dx: Math.cos(clampedAngle),
      dy: Math.sin(clampedAngle),
    };
  } else {
    return { dx: newDx, dy: newDy };
  }
};

const drawSlug = (ctx: CanvasRenderingContext2D, slug: Slug) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.beginPath();
  ctx.moveTo(slug.body[0].x, slug.body[0].y);
  ctx.lineTo(slug.body[0].x, slug.body[0].y);
  slug.body.slice(1, -1).forEach((b, i, arr) => {
    if (!arr[i + 1]) return;
    let width = 8;
    if (i < 20) {
      width = (i / 20) * 8;
    } else if (arr.length - i < 40) {
      width = ((arr.length - i) / 40) * 8;
    }
    const point = getBodyPathPoint(b.x, b.y, arr[i + 1].x, arr[i + 1].y, width);
    ctx.lineTo(point.x, point.y);
  });
  ctx.lineTo(
    slug.body[slug.body.length - 1].x,
    slug.body[slug.body.length - 1].y
  );

  slug.body
    .slice(1, -1)
    .reverse()
    .forEach((b, i, arr) => {
      if (!arr[i + 1]) return;
      let width = 8;
      if (i < 40) {
        width = (i / 40) * 8;
      } else if (arr.length - i < 20) {
        width = ((arr.length - i) / 20) * 8;
      }
      const point = getBodyPathPoint(
        b.x,
        b.y,
        arr[i + 1].x,
        arr[i + 1].y,
        width
      );
      ctx.lineTo(point.x, point.y);
    });
  ctx.lineTo(slug.body[0].x, slug.body[0].y);
  ctx.fillStyle = "#bfa98c";

  ctx.lineWidth = 1;
  ctx.fill();
  ctx.closePath();

  const angle = Math.atan2(slug.dy, slug.dx);
  const antennaX1 = slug.x + ANTENNA_LENGTH * Math.cos(angle - Math.PI / 6);
  const antennaY1 = slug.y + ANTENNA_LENGTH * Math.sin(angle - Math.PI / 6);
  const antennaX2 = slug.x + ANTENNA_LENGTH * Math.cos(angle + Math.PI / 6);
  const antennaY2 = slug.y + ANTENNA_LENGTH * Math.sin(angle + Math.PI / 6);

  ctx.beginPath();
  ctx.moveTo(slug.body[12].x, slug.body[12].y);
  ctx.lineTo(antennaX1, antennaY1);
  ctx.moveTo(slug.body[12].x, slug.body[12].y);
  ctx.lineTo(antennaX2, antennaY2);
  ctx.strokeStyle = "#bfa98c";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
};

const updatePosition = (slug: Slug, rangeX: number, rangeY: number) => {
  // get new angle
  const length = Math.hypot(slug.targetX - slug.x, slug.targetY - slug.y) || 1;
  const normalizedDx = (slug.targetX - slug.x) / length;
  const normalizedDy = (slug.targetY - slug.y) / length;

  const limited = limitTurnAngle(slug.dx, slug.dy, normalizedDx, normalizedDy);
  slug.dx = limited.dx;
  slug.dy = limited.dy;

  // update position

  const newPosition = { x: slug.x + slug.dx, y: slug.y + slug.dy };
  const newBody = [newPosition, ...slug.body];

  newBody.length = BODY_LENGTH;
  slug.body = newBody;
  slug.x = newPosition.x;
  slug.y = newPosition.y;

  // reached target?
  if (
    Math.abs(slug.x - slug.targetX) < TARGET_HITBOX_WH &&
    Math.abs(slug.y - slug.targetY) < TARGET_HITBOX_WH
  ) {
    slug.targetX = Math.random() * rangeX;
    slug.targetY = Math.random() * rangeY;
  }
};

const getBodyPathPoint = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  distance: number
) => {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const perpVector = { x: -dy, y: dx };

  const length = Math.sqrt(
    perpVector.x * perpVector.x + perpVector.y * perpVector.y
  );
  const unitVector = { x: perpVector.x / length, y: perpVector.y / length };

  return {
    x: x1 + unitVector.x * distance,
    y: y1 + unitVector.y * distance,
  };
};

const SlugCanvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWrapperReady, setIsWrapperReady] = useState(false);

  const slug = useRef<Slug>({
    body: [],
    dx: 1,
    dy: 0,
    x: INITIAL_X,
    y: INITIAL_Y,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    if (wrapperRef.current) {
      setIsWrapperReady(true);
      slug.current.x = Math.random() * wrapperRef.current.clientWidth;
      slug.current.y = Math.random() * wrapperRef.current.clientHeight;
      slug.current.targetX = Math.random() * wrapperRef.current.clientWidth;
      slug.current.targetY = Math.random() * wrapperRef.current.clientHeight;
      slug.current.body = Array.from({ length: BODY_LENGTH }).map(() => ({
        x: slug.current.x,
        y: slug.current.y,
      }));
      slug.current.body.forEach(() =>
        updatePosition(
          slug.current,
          wrapperRef.current?.clientWidth ?? 0,
          wrapperRef.current?.clientHeight ?? 0
        )
      );
    }

    const setNewWh = () => {
      if (wrapperRef.current && canvasRef.current) {
        canvasRef.current.width = wrapperRef.current.clientWidth;
        canvasRef.current.height = wrapperRef.current.clientHeight;
      }
    };
    window.addEventListener("resize", setNewWh);

    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        updatePosition(
          slug.current,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const ctx = canvas.getContext("2d");
        if (ctx) {
          drawSlug(ctx, slug.current);
        }
      }
    }, 100);

    return () => {
      window.removeEventListener("resize", setNewWh);
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="h-full">
      {isWrapperReady && (
        <canvas
          ref={canvasRef}
          width={wrapperRef.current?.clientWidth}
          height={wrapperRef.current?.clientHeight}
          className="h-full"
        />
      )}
    </div>
  );
};

export default SlugCanvas;
