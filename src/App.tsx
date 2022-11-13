// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Apps
import TextEditor from './apps/TextEditor/index';

export default function App() {
  return (
    <div className="app__container">
      <div className="app__main">
        <Navbar />
        <TextEditor />
      </div>
      <Footer />
    </div>
  );
}
