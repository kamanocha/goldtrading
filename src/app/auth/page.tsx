import { AuthForm } from "@/components/auth/AuthForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sign In — PayYou Gold",
};

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gold-50 flex items-center justify-center px-4 py-12 pb-24">
      <div className="w-full" style={{ maxWidth: "400px" }}>
        <AuthForm />
      </div>
    </div>
  );
}
