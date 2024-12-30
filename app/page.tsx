import MailForm from "./components/MailForm/MailForm";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center">
        <h2 className="font-semibold text-3xl mb-4">お問い合わせフォーム</h2>
        <MailForm />
      </main>
      <footer></footer>
    </div>
  );
}
