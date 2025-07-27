import random

class FileLogger:
    def __init__(self, filename):
        self.filename = filename
        
    def log(self, message):
        try: 
            with open(self.filename, 'a') as file: 
                file.write(message + '\n')
        except Exception as e: 
            print(f"Couldn't write to log file: {e}")

class GuessNumber:
    def __init__(self, player_name, logger):
        self.player_name = player_name
        self.secret_number = random.randint(1, 10)
        self.attempts = 3
        self.logger = logger
    
    def play(self):
        self.logger.log(f"{self.player_name} started a new game. Secret Number: {self.secret_number}")
        print(f"\nHi {self.player_name}! I'm thinking of a number between 1 and 10. You have {self.attempts} attempts.")

        while self.attempts > 0:
            try:
                guess = int(input("Guess a Number: "))
            except ValueError:
                print('Please enter a valid number.')
                continue
        
            self.attempts -= 1 
            
            if guess == self.secret_number:
                print('Congratulations, you guessed the number correctly!')
                self.logger.log(f"{self.player_name} won in {3 - self.attempts} tries!") 
                return
            elif guess < self.secret_number:
                print(f'Too low! You have {self.attempts} attempts left.')
            else:
                print(f'Too high! You have {self.attempts} attempts left.')
            
        print(f'GAME OVER. The number was {self.secret_number}.')
        self.logger.log(f" {self.player_name} lost after 3 attempts.")

class GameManager:
    def __init__(self, player_name):
        self.player_name = player_name
        self.logger = FileLogger("game_log.txt")
        self.game = GuessNumber(self.player_name, self.logger)

    def start_game(self):
      
        self.logger.log(f"--- GameManager started a session for {self.player_name} ---")
        
        self.game.play()
        
        # The manager logs
        self.logger.log(f"--- GameManager session for {self.player_name} ended ---\n")
        print("\nThanks for playing!")


if __name__ == '__main__':
    print("Welcome to the Guessing numbers game Game!")

    player_input = input('Enter Your Name: ')
    manager = GameManager(player_input)
    manager.start_game()
