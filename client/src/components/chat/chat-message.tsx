interface Message {
  role: 'user' | 'assistant';
  message: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  // Format message for bullet points and other formatting
  const formatMessage = (text: string) => {
    // Handle bullet points
    if (text.includes('\n- ')) {
      const parts = text.split('\n- ');
      const firstPart = parts[0];
      const listItems = parts.slice(1);
      
      return (
        <>
          <p className="text-sm leading-relaxed">{firstPart}</p>
          {listItems.length > 0 && (
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              {listItems.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          )}
        </>
      );
    }
    
    // Handle numbered lists
    if (text.includes('\n1.')) {
      const parts = text.split('\n');
      const textParts = [];
      const listItems = [];
      
      let inList = false;
      
      for (const part of parts) {
        if (/^\d+\./.test(part.trim())) {
          inList = true;
          listItems.push(part.trim());
        } else if (part.trim() !== '') {
          if (inList) {
            break; // End of list
          }
          textParts.push(part);
        }
      }
      
      return (
        <>
          <p className="text-sm leading-relaxed">{textParts.join('\n')}</p>
          {listItems.length > 0 && (
            <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
              {listItems.map((item, index) => {
                const content = item.replace(/^\d+\.\s*/, '');
                return <li key={index} className="text-gray-700">{content}</li>;
              })}
            </ol>
          )}
        </>
      );
    }
    
    // No special formatting needed
    return <p className="text-sm leading-relaxed">{text}</p>;
  };
  
  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-lg py-3 px-4 max-w-xs text-white shadow-sm">
          <p className="text-sm">{message.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-start mb-4">
      <div className="flex">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mr-2 mt-1 shadow-sm">
          <i className="fas fa-robot text-white text-xs"></i>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg py-3 px-4 max-w-xs shadow-sm">
          {formatMessage(message.message)}
        </div>
      </div>
    </div>
  );
}
