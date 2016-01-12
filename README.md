# knappy
Musings on knapsack problems.
That's a recursive and memoized version of the 0 1 problem, which has better time and space complexity than the bottom up dynamic programming approach that is in all textbooks

## Performance
This is one of the few problems I found where one can use a version of the Y combinator for something semi-practical:
In this case it is to memoize the highly recursive knapsack solution, but doing it cleanly separating the problem logic from the the caching "plumbing".
The Y combinator does not add much performance overhead. The performance profile is mostly affected by how performant 
the multi-dimenstional lookup table used for the cache is. A well sized and optimized one can have a 10x performance difference 
with a totally dynamic one sized lazily.

## node version
To run the code you need node 5.4.0 or higher with the harmony flag on as the code uses ES6 rest parameters in the Y combinator

