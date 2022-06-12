import '../Css/CustomButton.css'

function CustomButton(props) {
    return (  
        <button className={"customButton " + props.class} onClick={props.buttonFunction}>{props.text}</button>            
    );
}

export default CustomButton;