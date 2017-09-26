import * as React from 'react';
import * as ReactDOM from 'react-dom';



const countryName:string = ___('country_name');



export default ReactDOM.render(
    <div className="MainPage">
        <div className="container container-static">
            {countryName}
        </div>
    </div>,
    document.getElementById('AppRoot')
);
