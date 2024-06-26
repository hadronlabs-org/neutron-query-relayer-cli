// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"
	"strconv"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// NeutronInterchainqueriesQueryRegisteredQueryResponse neutron interchainqueries query registered query response
//
// swagger:model neutron.interchainqueries.QueryRegisteredQueryResponse
type NeutronInterchainqueriesQueryRegisteredQueryResponse struct {

	// registered query
	RegisteredQuery *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery `json:"registered_query,omitempty"`
}

// Validate validates this neutron interchainqueries query registered query response
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponse) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateRegisteredQuery(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *NeutronInterchainqueriesQueryRegisteredQueryResponse) validateRegisteredQuery(formats strfmt.Registry) error {
	if swag.IsZero(m.RegisteredQuery) { // not required
		return nil
	}

	if m.RegisteredQuery != nil {
		if err := m.RegisteredQuery.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("registered_query")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("registered_query")
			}
			return err
		}
	}

	return nil
}

// ContextValidate validate this neutron interchainqueries query registered query response based on the context it is used
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponse) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidateRegisteredQuery(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *NeutronInterchainqueriesQueryRegisteredQueryResponse) contextValidateRegisteredQuery(ctx context.Context, formats strfmt.Registry) error {

	if m.RegisteredQuery != nil {

		if swag.IsZero(m.RegisteredQuery) { // not required
			return nil
		}

		if err := m.RegisteredQuery.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("registered_query")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("registered_query")
			}
			return err
		}
	}

	return nil
}

// MarshalBinary interface implementation
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponse) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponse) UnmarshalBinary(b []byte) error {
	var res NeutronInterchainqueriesQueryRegisteredQueryResponse
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery neutron interchainqueries query registered query response registered query
//
// swagger:model NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery
type NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery struct {

	// The IBC connection ID for getting ConsensusState to verify proofs
	ConnectionID string `json:"connection_id,omitempty"`

	// The unique id of the registered query.
	ID string `json:"id,omitempty"`

	// The KV-storage keys for which we want to get values from remote chain
	Keys []*NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryKeysItems0 `json:"keys"`

	// The local chain last block height when the query result was updated.
	LastSubmittedResultLocalHeight string `json:"last_submitted_result_local_height,omitempty"`

	// last submitted result remote height
	LastSubmittedResultRemoteHeight *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryLastSubmittedResultRemoteHeight `json:"last_submitted_result_remote_height,omitempty"`

	// The address that registered the query.
	Owner string `json:"owner,omitempty"`

	// The query type identifier: `kv` or `tx` now
	QueryType string `json:"query_type,omitempty"`

	// The filter for transaction search ICQ
	TransactionsFilter string `json:"transactions_filter,omitempty"`

	// Parameter that defines how often the query must be updated.
	UpdatePeriod string `json:"update_period,omitempty"`
}

// Validate validates this neutron interchainqueries query registered query response registered query
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateKeys(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateLastSubmittedResultRemoteHeight(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery) validateKeys(formats strfmt.Registry) error {
	if swag.IsZero(m.Keys) { // not required
		return nil
	}

	for i := 0; i < len(m.Keys); i++ {
		if swag.IsZero(m.Keys[i]) { // not required
			continue
		}

		if m.Keys[i] != nil {
			if err := m.Keys[i].Validate(formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("registered_query" + "." + "keys" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("registered_query" + "." + "keys" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery) validateLastSubmittedResultRemoteHeight(formats strfmt.Registry) error {
	if swag.IsZero(m.LastSubmittedResultRemoteHeight) { // not required
		return nil
	}

	if m.LastSubmittedResultRemoteHeight != nil {
		if err := m.LastSubmittedResultRemoteHeight.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("registered_query" + "." + "last_submitted_result_remote_height")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("registered_query" + "." + "last_submitted_result_remote_height")
			}
			return err
		}
	}

	return nil
}

// ContextValidate validate this neutron interchainqueries query registered query response registered query based on the context it is used
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidateKeys(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidateLastSubmittedResultRemoteHeight(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery) contextValidateKeys(ctx context.Context, formats strfmt.Registry) error {

	for i := 0; i < len(m.Keys); i++ {

		if m.Keys[i] != nil {

			if swag.IsZero(m.Keys[i]) { // not required
				return nil
			}

			if err := m.Keys[i].ContextValidate(ctx, formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("registered_query" + "." + "keys" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("registered_query" + "." + "keys" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery) contextValidateLastSubmittedResultRemoteHeight(ctx context.Context, formats strfmt.Registry) error {

	if m.LastSubmittedResultRemoteHeight != nil {

		if swag.IsZero(m.LastSubmittedResultRemoteHeight) { // not required
			return nil
		}

		if err := m.LastSubmittedResultRemoteHeight.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("registered_query" + "." + "last_submitted_result_remote_height")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("registered_query" + "." + "last_submitted_result_remote_height")
			}
			return err
		}
	}

	return nil
}

// MarshalBinary interface implementation
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery) UnmarshalBinary(b []byte) error {
	var res NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQuery
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryKeysItems0 neutron interchainqueries query registered query response registered query keys items0
//
// swagger:model NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryKeysItems0
type NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryKeysItems0 struct {

	// Key you want to read from the storage
	// Format: byte
	Key strfmt.Base64 `json:"key,omitempty"`

	// Path (storage prefix) to the storage where you want to read value by key (usually name of cosmos-sdk module: 'staking', 'bank', etc.)
	Path string `json:"path,omitempty"`
}

// Validate validates this neutron interchainqueries query registered query response registered query keys items0
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryKeysItems0) Validate(formats strfmt.Registry) error {
	return nil
}

// ContextValidate validates this neutron interchainqueries query registered query response registered query keys items0 based on context it is used
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryKeysItems0) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryKeysItems0) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryKeysItems0) UnmarshalBinary(b []byte) error {
	var res NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryKeysItems0
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryLastSubmittedResultRemoteHeight The remote chain last block height & revision number when the query result was updated.
//
// swagger:model NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryLastSubmittedResultRemoteHeight
type NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryLastSubmittedResultRemoteHeight struct {

	// revision height
	RevisionHeight string `json:"revision_height,omitempty"`

	// revision number
	RevisionNumber string `json:"revision_number,omitempty"`
}

// Validate validates this neutron interchainqueries query registered query response registered query last submitted result remote height
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryLastSubmittedResultRemoteHeight) Validate(formats strfmt.Registry) error {
	return nil
}

// ContextValidate validates this neutron interchainqueries query registered query response registered query last submitted result remote height based on context it is used
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryLastSubmittedResultRemoteHeight) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryLastSubmittedResultRemoteHeight) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryLastSubmittedResultRemoteHeight) UnmarshalBinary(b []byte) error {
	var res NeutronInterchainqueriesQueryRegisteredQueryResponseRegisteredQueryLastSubmittedResultRemoteHeight
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
