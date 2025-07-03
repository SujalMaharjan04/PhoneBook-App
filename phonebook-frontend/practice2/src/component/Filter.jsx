const Filter = (props) => {
  return (
    <div>
      filter: <input value = {props.find} onChange={props.handlefind} />
    </div>
  )
}

export default Filter;