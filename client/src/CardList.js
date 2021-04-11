import Card from './Card'
function CardList() {
    return(
        <div id = "card-list">
            <Card movieName = {"Thor"}/>
            <Card movieName = {"Iron Man"}/>
            <Card movieName = {"Avengers"}/>
            <Card movieName = {"Black Widow"}/>
            <Card movieName = {"Justice League"}/>
        </div>
    )
}

export default CardList;