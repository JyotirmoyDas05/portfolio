import type React from "react";

export function JyotirmoyMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M113.778 0H170.667V64H113.778V0ZM170.667 64V256H56.8889V192H113.778V64H170.667ZM455.111 64H341.333V192H455.111V256H284.444V0H455.111V64ZM512 192H455.111V64H512V192Z M0 128H56.8889V192H0V128Z M0 192H56.8889V256H0V192Z"
      />
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="${color}" d="M113.778 0H170.667V64H113.778V0ZM170.667 64V256H56.8889V192H113.778V64H170.667ZM455.111 64H341.333V192H455.111V256H284.444V0H455.111V64ZM512 192H455.111V64H512V192Z M0 128H56.8889V192H0V128Z M0 192H56.8889V256H0V192Z"/></svg>`;
}
