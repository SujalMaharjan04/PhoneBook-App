const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.addnote}>
                <div>
                    name: <input value = {props.value} onChange={props.handleclick} />
                </div>
                <div>
                    number: <input value = {props.number} onChange={props.handleclicknum} />
                </div>
                <div>
                    <button type = "Submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm;