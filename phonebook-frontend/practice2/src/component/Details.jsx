const Details = (props) => {
    return (
        <div>
            {props.findname.map(person => <p key = {person.id}>{person.name} {person.number}
            <button onClick = {() => props.handleDelete(person.id)}>Delete</button>
            </p>)}
        </div>
    )
}

export default Details;