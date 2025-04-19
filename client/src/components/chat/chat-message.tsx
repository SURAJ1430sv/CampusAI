interface Message {
  role: 'user' | 'assistant';
  message: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  // Format message for bullet points
  const formatMessage = (text: string) => {
    if (!text.includes('\n- ')) return text;
    
    const parts = text.split('\n- ');
    const firstPart = parts[0];
    const listItems = parts.slice(1);
    
    return (
      <>
        <p className="text-sm">{firstPart}</p>
        {listItems.length > 0 && (
          <ul className="list-disc list-inside text-sm mt-1">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </>
    );
  };
  
  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-primary rounded-lg py-2 px-3 max-w-xs text-white">
          <p className="text-sm">{message.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-start mb-4">
      <div className="flex">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2 mt-1">
          <i className="fas fa-robot text-white text-xs"></i>
        </div>
        <div className="bg-gray-200 rounded-lg py-2 px-3 max-w-xs">
          {formatMessage(message.message)}
        </div>
      </div>
    </div>
  );
}
