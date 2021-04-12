from flask import Flask, request
from flask_cors import CORS, cross_origin
from scipy.sparse import csr_matrix
import pandas as pd
import pickle
import json


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

filename = 'finalized_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))
ratings = pd.read_csv("ratings.csv")
movies = pd.read_csv("movies.csv")
no_user_voted = ratings.groupby('movieId')['rating'].agg('count')
no_movies_voted = ratings.groupby('userId')['rating'].agg('count')
final_dataset = ratings.pivot(index='movieId',columns='userId',values='rating')
final_dataset.fillna(0,inplace=True)
final_dataset=final_dataset.loc[:,no_movies_voted[no_movies_voted > 50].index]
csr_data = csr_matrix(final_dataset.values)
final_dataset.reset_index(inplace=True)

@app.route( '/get_movie_list', methods=['POST'] )
def analyse_text():
    # Search codes: 404 not found, 200 found, 500 Error
    try:
        data = request.data.decode('UTF-8')
        loaded_movie_name = json.loads(data)
        movie_name = loaded_movie_name['movieName']
        movie_name = movie_name.title()
        n_movies_to_reccomend = 10

        movie_list = movies[movies['title'].str.contains(movie_name)] 

        if len(movie_list):    
            movie_idx= movie_list.iloc[0]['movieId']
            movie_idx = final_dataset[final_dataset['movieId'] == movie_idx].index[0] 
            distances, indices = loaded_model.kneighbors(csr_data[movie_idx],n_neighbors=n_movies_to_reccomend+1)
            rec_movie_indices = sorted(list(zip(indices.squeeze().tolist(),distances.squeeze().tolist())),key=lambda x: x[1])[:0:-1]
            recommend_frame = []
            for val in rec_movie_indices:
                movie_idx = final_dataset.iloc[val[0]]['movieId']
                idx = movies[movies['movieId'] == movie_idx].index
                recommend_frame.append({'Title':movies.iloc[idx]['title'].values[0],'Distance':val[1]})
            df = pd.DataFrame(recommend_frame,index=range(1,n_movies_to_reccomend+1))
            df = df.drop('Distance', 1)
            
            response_data = {
                'movie_list': pd.Series(df['Title']).tolist(),
                'search_code': 200
            }
            return response_data
        else:
            response_data = {
                'message': "No movies found, please try with something else",
                'search_code': 404
            }
            return response_data

    except Exception as e:
        response_data = {
            'message': "Error " + str(e),
            'search_code': 404
        }
        return response_data



if __name__ == "__main__":
    app.run( debug=True )  # for production turn it off(False)