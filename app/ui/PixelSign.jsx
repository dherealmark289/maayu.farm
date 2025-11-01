import Link from "next/link";

export default function PixelSign({ iconUrl, label, href }) {
  return (
    <Link href={href || "#"} className="menu-item ui-sign notched-90 ui-reset-outlines">
      {iconUrl ? (
        <img
          className="icon-3d"
          alt=""
          src={iconUrl}
          aria-hidden="true"
        />
      ) : null}
      <span className="label">{label}</span>
    </Link>
  );
}


