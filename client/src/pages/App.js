import '../App.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AllQuestion from '../utilities/AllQuestion';
import Hero from './Hero/Hero';



const App = ()=>{

	return (
		<>
			<Header />
			<Hero />
			<AllQuestion />
			<Footer />
		</>
	)
}

export default App;
