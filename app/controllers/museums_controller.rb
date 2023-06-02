class MuseumsController < ApplicationController
    def index
        museums = Museum.all
        render json: museums
    end
end
