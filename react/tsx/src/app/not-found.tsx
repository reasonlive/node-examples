import { Button } from "~/shared/ui";

export default function NotFound() {
  return (
    <div
      style={{
        alignItems: "center",

        display: "flex",
        flexDirection: "column",
        gap: "24px",
        height: "780px",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
        }}
      >{`Страница не найдена`}</h2>
      <Button
        elementType="link"
        href="/"
        style={{
          alignItems: "center",
          backgroundColor: "var(--blue-30)",

          borderRadius: "8px",

          display: "flex",

          fontSize: "20px",
          justifyContent: "center",
          padding: "12px 32px",
        }}
      >
        {`Вернутся на главную`}
      </Button>
    </div>
  );
}
