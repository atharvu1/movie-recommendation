import Card from './Card'
function CardList( { movieList } ) {
    console.log(movieList)
    return(
        <div id = "card-list">
            {
                movieList.length > 0 && movieList.map( movie => (
                    <Card movieName = {movie}/>
                ))
                
            }
        </div>
    )
}

export default CardList;