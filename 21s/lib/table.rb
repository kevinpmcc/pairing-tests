class Table
  attr_reader :player, :cards, :dealer

  def initialize(deck, player, dealer)
    @player = player
    @dealer = dealer
    @cards = deck.cards
  end

  def start_game
    @player.cards << cards.shift 
    @player.cards << cards.shift 
    @dealer.cards << cards.shift
    @dealer.cards << cards.shift
  end

  def player_hand_score
    @player.cards.map {|c| c.rank.to_i }.reduce(:+)
  end

  def dealer_hand_score
    @dealer.cards.map {|c| c.rank.to_i }.reduce(:+)
  end

  def any_blackjacks?
    dealer_hand_score == 21 || player_hand_score == 21
  end
end
