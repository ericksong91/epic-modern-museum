class PaintingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response

    def create
        if find_user
            user = User.find(session[:user_id])
            painting = user.paintings.create!(paint_params)
            render json: painting, status: :created
        else
            render json: { "errors": "Not authorized" }, status: :unauthorized
        end
    end

    def update
        if find_user
            user = User.find(find_user)
            painting = Painting.find(find_painting)

            if painting.user_id === user.id
                painting.update(paint_params)
                render json: painting, status: :accepted
            else
                render json:  { "errors": "Not authorized" }, status: :unauthorized
            end
        else
            render json:  { "errors": "Not authorized" }, status: :unauthorized
        end
    end

    def destroy
        if find_user
            user = User.find(find_user)
            painting = Painting.find(find_painting)

            if painting.user_id === user.id
                painting.destroy
                head :no_content
            else
                render json:  { "errors": "Not authorized" }, status: :unauthorized
            end
        else
            render json:  { "errors": "Not authorized" }, status: :unauthorized
        end
    end

    private

    def render_record_not_found_response
        render json: { error: "Painting not found" }, status: :not_found
    end

    def find_user
        session[:user_id]
    end

    def paint_params
        params.permit(:name, :bio, :img_url, :year, :museum_id)
    end

    def find_painting
        params[:id]
    end
end
