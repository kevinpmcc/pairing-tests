class Player
  attr_reader :cards, :name

  def initialize(name)
    @name = name
    @cards = []
  end
end
