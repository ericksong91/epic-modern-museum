class MuseumsController < ApplicationController
    def index
        museum = Museum.all 
        render json: museum
    end
end
