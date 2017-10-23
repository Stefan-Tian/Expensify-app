// yarn add enzyme enzyme-adapter-react-16 raf
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
