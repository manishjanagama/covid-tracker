const sortData = (data) => {
    const sortedData = [...data]

    sortedData.sort((a, b) => {
       return  a.cases > b.cases ? -1 : 1
    })
    return sortedData
}

export default sortData
