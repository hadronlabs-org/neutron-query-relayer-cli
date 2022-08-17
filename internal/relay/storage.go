package relay

// RelayerStorage is local storage we use to store queries "history", will be nicely implemented via LSC-119
type RelayerStorage interface {
	SetLastUpdateBlock(queryId uint64, block uint64) error
	GetLastUpdateBlock(queryID uint64) (block uint64, exists bool)
}