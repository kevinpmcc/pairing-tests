class Robot
  attr_reader :current_location, :projected_location
  

  
  def initialize
    @current_location = [0,0]
    @projected_location = [0,0]
    request_input
  end

  def request_input
    puts 'Please enter directions'
    input = gets.chomp
    directions(input)
  end

  def directions(input_text)
    input_text.split.each do |direction|
      case direction
      when 'N'
        go_north
      when 'E'
        go_east
      when 'S'
        go_south
      when 'W'
        go_west
      end
    end
    if inside_warehouse?
      @current_location = @projected_location
    else
      raise 'SORRY OUTSIDE LIMITS'
    end
  end

  def go_north
    @projected_location[0] += 1 
  end
    
  def go_east
    @projected_location[1] += 1
  end

  def inside_warehouse?
    @projected_location[0].abs <=10 && @projected_location[1].abs <= 10
  end

  def go_south
    @projected_location[0] -= 1
  end

  def go_west
    @projected_location[1] -= 1
  end
end

Robot.new
