class Deck
  attr_reader :cards

  RANKS = %w[2 3 4 5 6 7 8 9 10 J Q K A]
  SUITS = %w[spade club diamond heart]

  def initialize
    @cards = []
    build_deck
  end

  def build_deck
    SUITS.each do |suit|
      RANKS.each do |rank|
        @cards << Card.new(suit, rank)
      end
    end
  end
end

class Card < Struct.new(:suit, :rank)
end
