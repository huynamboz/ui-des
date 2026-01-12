import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface LoginScreenProps {
  onCancel: () => void;
  onLogin: (username: string, pin: string) => void;
}

export function LoginScreen({ onCancel, onLogin }: LoginScreenProps) {
  const [pin, setPin] = useState<string>('');

  const handleNumberClick = (num: number) => {
    if (pin.length < 6) {
      setPin(pin + num.toString());
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleConfirm = () => {
    if (pin.length === 6) {
      onLogin('Admin', pin);
      // Reset for next login
      setPin('');
    }
  };

  const handleCancel = () => {
    setPin('');
    onCancel();
  };

  return (
    <div className="w-[480px] h-[480px] bg-white shadow-lg flex flex-col">
      {/* Header - 15% height */}
      <header className="h-[15%] bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-center">Login to Account</h1>
      </header>

      {/* PIN Input Display - 20% height */}
      <div className="h-[20%] flex flex-col items-center justify-center bg-gray-50 border-b border-gray-200">
        <div className="text-lg text-gray-600 mb-2">Enter PIN:</div>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="w-11 h-11 rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center"
            >
              <span className="text-3xl text-gray-700">
                {pin.length > index ? '•' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Numeric Keypad - 50% height */}
      <div className="h-[50%] p-6 grid grid-cols-3 gap-3 bg-gradient-to-b from-white to-gray-50">
        {/* Numbers 1-9 */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="bg-white border-2 border-orange-200 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 active:bg-gradient-to-br active:from-orange-100 active:to-red-100 rounded-xl shadow-sm hover:shadow-md transition-all font-semibold text-3xl text-gray-700 active:scale-95"
          >
            {num}
          </button>
        ))}
        
        {/* Bottom row: empty, 0, backspace */}
        <div></div>
        <button
          onClick={() => handleNumberClick(0)}
          className="bg-white border-2 border-orange-200 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 active:bg-gradient-to-br active:from-orange-100 active:to-red-100 rounded-xl shadow-sm hover:shadow-md transition-all font-semibold text-3xl text-gray-700 active:scale-95"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="bg-white border-2 border-red-200 hover:border-red-400 hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 active:bg-gradient-to-br active:from-red-100 active:to-orange-100 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>
      </div>

      {/* Action Buttons - 15% height */}
      <footer className="h-[15%] flex items-center justify-center gap-4 px-6 bg-gray-50 border-t border-gray-200">
        <Button
          onClick={handleConfirm}
          disabled={pin.length !== 6}
          size="lg"
          className="flex-1 h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm
        </Button>
        <Button
          onClick={handleCancel}
          size="lg"
          variant="outline"
          className="flex-1 h-12 border-orange-600 text-orange-600 hover:bg-orange-50"
        >
          Cancel
        </Button>
      </footer>
    </div>
  );
}