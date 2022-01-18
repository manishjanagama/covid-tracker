const Table = ({countries}) => {
    return(
        <div className="table">
            <table className="table">
            <tbody>
            {countries.map(({country, cases}) => (
                <tr key={country}>
                <td>{country}</td>
                <td>{cases}</td>
            </tr>
            ))}
            </tbody>
           
        </table>
        </div>
    )
}

export default Table