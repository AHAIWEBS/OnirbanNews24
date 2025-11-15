import { useState } from "react";

interface PollOption {
  id: number;
  text: string;
  votes: number;
}

const initialPoll = {
  question: "আগামী নির্বাচনে সবচেয়ে গুরুত্বপূর্ণ বিষয় কোনটি?",
  options: [
    { id: 1, text: "অর্থনৈতিক উন্নয়ন", votes: 245 },
    { id: 2, text: "শিক্ষা ব্যবস্থা", votes: 189 },
    { id: 3, text: "স্বাস্থ্যসেবা", votes: 156 },
    { id: 4, text: "দুর্নীতি দমন", votes: 312 },
  ],
  totalVotes: 902,
};

const PollSection = () => {
  const [poll, setPoll] = useState(initialPoll);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionId: number) => {
    if (hasVoted) return;

    setSelectedOption(optionId);
    setPoll((prev) => ({
      ...prev,
      options: prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      ),
      totalVotes: prev.totalVotes + 1,
    }));
    setHasVoted(true);
  };

  const getPercentage = (votes: number) => {
    return ((votes / poll.totalVotes) * 100).toFixed(1);
  };

  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-primary" />
        <h2 className="text-2xl font-bold">অনলাইন জরিপ</h2>
      </div>

      <div className="bg-card rounded-lg border border-border p-6 max-w-2xl">
        <h3 className="text-xl font-bold mb-6">{poll.question}</h3>

        <div className="space-y-3">
          {poll.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                hasVoted
                  ? selectedOption === option.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-muted/30"
                  : "border-border hover:border-accent hover:bg-accent/5"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{option.text}</span>
                {hasVoted && (
                  <span className="text-sm font-bold text-accent">
                    {getPercentage(option.votes)}%
                  </span>
                )}
              </div>
              {hasVoted && (
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${getPercentage(option.votes)}%` }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {hasVoted ? (
            <span>আপনার ভোট গণনা করা হয়েছে। মোট ভোট: {poll.totalVotes}</span>
          ) : (
            <span>মোট ভোট: {poll.totalVotes}</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default PollSection;
