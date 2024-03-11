package relay

// Storage is local storage we use to store queries history: known queries, know transactions and its statuses
type Storage interface {
	GetLastQueryHeight(queryID uint64) (block uint64, found bool, err error)
	SetLastQueryHeight(queryID uint64, block uint64) error
	Close() error
}
