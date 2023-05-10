class MuseumsController < ApplicationController
    def index
        museums = Museum.all
        render json: museums
    end

    # def show
    #     museum = Museum.find(find_museum)
    #     render json: museum
    # end

    # private

    # def find_museum
    #     params[:id]
    # end
end
