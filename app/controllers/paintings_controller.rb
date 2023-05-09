class PaintingsController < ApplicationController
    def index
        paintings = Painting.all 
        render json: paintings
    end

    def create
        if session[:user_id]
            user = User.find(session[:user_id])
            painting = user.paintings.create!(paint_params)
            render json: painting, status: :created
        else
            render json: {"errors": ["Not authorized"], status: :unauthorized}
        end
    end

    def update
        if session[:user_id]
            painting = Painting.find(find_painting)
            painting.update(paint_params)
            render json: painting, status: :accepted
        else
            render json:  {"errors": ["Not authorized"], status: :unauthorized}
        end
    end

    def destroy
        painting = Painting.find(paint_params)
        painting.destroy
        head :no_content
    end

    private

    def paint_params
        params.permit(:name, :bio, :img_url, :year, :museum_id)
    end

    def find_painting
        params[:id]
    end
end
