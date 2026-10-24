'use client'
import Link from "next/link";

export default function Home() {


  return (
    <div>
      <nav style={{justifyContent: "end"}} className="navbar navbar-expand navbar-light bg-primary topbar mb-4 static-top shadow">
        <div>
          <Link className="btn btn-outline-light" href="/login">Login</Link>
        </div>
      
      </nav>
      <h1 style={{textAlign: 'center'}}>Olá!</h1>
    </div>
  );
}

