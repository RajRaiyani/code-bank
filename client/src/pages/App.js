import '../App.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import QuestionData from '../utilities/QuestionData';
import Hero from './Hero/Hero';



const App = ()=>{

	return (
		<>
			<Header />
			<Hero />
			<QuestionData></QuestionData>

			<Footer />
		</>
	)
}

export default App;
