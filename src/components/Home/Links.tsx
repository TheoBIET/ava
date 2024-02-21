import { IoSettings } from "react-icons/io5";

export default function Links({ className }: Readonly<{
  className: string;
}>) {
  return (
    <div className={`Links ${className}`}>
      <a href="/settings" className="Links__item">
        <IoSettings />
      </a>
    </div>
  )
}