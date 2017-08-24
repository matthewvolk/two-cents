class PagesController < ApplicationController           #AppCont is a pre-written rails based class

  # GET Request for "/", which is our homepage
  def home                                              # <- functions inside of a class are called methods
    @basic_plan = Plan.find(1)
    @pro_plan = Plan.find(2)
  end
  
  def about
  end
end
