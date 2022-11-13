// React
import { useState } from 'react';

// Styling
import './texteditor.scss';

// Components
import { DefaultEditor } from 'react-simple-wysiwyg';

export default function TextEditor() {
  const [html, setHtml] = useState(
    '<span style="font-size: 1rem;">my </span><b style="font-size: 1rem;">HTML</b><br><div><br></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed feugiat mi. In imperdiet auctor magna, et convallis metus ultricies at. Fusce euismod neque vel laoreet mattis. Cras a tempus metus. Phasellus malesuada varius nisl eget accumsan. Mauris nec elit efficitur, posuere purus eu, iaculis ligula. Cras fermentum pellentesque accumsan. Duis accumsan metus vel fringilla tincidunt. Fusce nec pretium dui. Mauris malesuada venenatis nulla ullamcorper interdum. Phasellus aliquet tincidunt justo, a mollis ligula ultrices at. Vestibulum sem lacus, tempor iaculis magna quis, auctor tempus justo. Proin cursus ligula interdum nisl gravida interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed eleifend eros in metus posuere congue.<br></div><div><br></div><div><br></div>'
  );

  function onChange(e: any) {
    setHtml(e.target.value);
  }

  return <DefaultEditor value={html} onChange={onChange} />;
}
