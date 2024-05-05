import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { PrivateRoutes } from "./utils/privateRoutes";
import Blog from "./pages/Blog";

const App = () => {
  return (
    <Routes>
      {/* <Route path="otp" element={<Otp />} /> */}
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Route>
    </Routes>
  );
};
export default App;
