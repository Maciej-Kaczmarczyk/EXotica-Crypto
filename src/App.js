import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import { AuthContextProvider } from "./context/AuthContext";

const Account = React.lazy(() => import("./routes/Account"));
const SignIn = React.lazy(() => import("./routes/SignIn"));
const SignUp = React.lazy(() => import("./routes/SignUp"));
const CoinPage = React.lazy(() => import("./routes/CoinPage"));


function App() {
  return (
    <div className="px-4 md:px-20 xl:px-32">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/coin/:coinId" element={<CoinPage />}>
            <Route path=":coinId" />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
