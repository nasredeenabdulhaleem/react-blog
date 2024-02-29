import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import Navigation from "./components/nav";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from "./pages/about";
import Contact from "./pages/contact";
import Error from "./pages/404";
import Base from "./pages/base";
import Article from "./pages/article";
import CreateArticle from "./pages/create";
import { AuthProvider } from "./context/AuthContext";
import DashboardBase from "./pages/blog/dashboardBase";
import Dashboard from "./pages/blog/dashboard";
import ArticleEdit from "./pages/blog/editArticle";
function App() {
	return (
		<div className="App">
			
			 <BrowserRouter>
			 <AuthProvider>
			 <Routes>
			 <Route path="/"  element={<Base />} >
				
			 	<Route index element={<Home/>} exact/>
				
			 	<Route path="/about" element={<About/>}/>
			 	<Route path="/contact" element={<Contact/>}/>
				<Route path="/article/detail/:articleid" element={<Article/>}/>
				
				
			 	</Route>
				
				<Route path="/" element={<PrivateRoute><DashboardBase/></PrivateRoute>}>
				<Route path="/dashboard" index element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
				<Route path="/article/create" element={<PrivateRoute><CreateArticle/></PrivateRoute>}/>
				<Route path="/article/edit/:articleid" element={<PrivateRoute><ArticleEdit/></PrivateRoute>}/>
				</Route>
				
				 <Route path="/login" element={<Login/>} />
			 	
			 	<Route path="*" element={<Error/>} />
			</Routes>
			</AuthProvider> 
			</BrowserRouter>
			{/* <BrowserRouter>
			 
			 <Routes>
			 <Route path="/" element={<Home />}>
			 	<Navigation />
			 	<Route path="/about" element={<About/>}></Route>
				 {/* <Route path="/" element={<Home />}></Route> */}
			{/* </Route>
			 <Route path="/login" element={<Login/>} />
			</Routes> *
			</BrowserRouter> */}
			{/* <Login /> */}
		</div>
	);
}

export default App;
