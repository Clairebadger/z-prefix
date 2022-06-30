import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
/*NOTE: I took some time to learn MUI but I am also still learning so I used this page as a resource for this component:
https://codesandbox.io/s/flamboyant-stonebraker-le1eq?file=/index.js
*/

const EditableText = (props) => {
    let [isEdit, setIsEdit] = useState(false)
    let [value, setValue] = useState(props.val);
    

    useEffect(()=>{
        setValue(props.val)
    },[props.val])

    let toggleEdit = () =>{
        setIsEdit(!isEdit)
    }


    let handleChange = () => {
        props.callback({
          ...props.input,
          [props.field] : value
        });
    }

    const handleClick = () => {
        toggleEdit()
        handleChange()
    }

    return (
        <>
        {   isEdit ?
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input className="MuiTypography-root MuiTypography-h4 MuiTypography-displayInline" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <Typography style={{ display: "none" }} />
                    <Button size="small" onClick={handleClick}> Done </Button>
                </div>

            :
            <div >
                <Typography style={{ display: "flex", alignItems: "center" }}>{value}</Typography>
                {props.canEdit ? <Button size="small" onClick={toggleEdit}>Edit</Button> : <></>}
            </div>
            
        }
        {console.log(value)}
        {console.log(props.val)}
    </>);
}

export default EditableText