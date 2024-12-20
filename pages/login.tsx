import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter for redirection

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormState>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const router = useRouter(); // Initialize the router

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      // Redirect to the `/in-site` page after successful login
      alert("Login successful!");
      router.push("/in-site"); // Use router.push for navigation
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Navigation Bar */}
      <nav className="w-full p-4 bg-indigo-600 text-white shadow-lg">
        <div className="flex items-center justify-start max-w-screen-xl mx-auto">
          <button
            onClick={() => router.push("/")}
            className="text-2xl font-bold hover:text-yellow-300 transition"
          >
            Scriptorium
          </button>
        </div>
      </nav>


      {/* Login Form */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="w-80 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded shadow-sm"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded shadow-sm"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}