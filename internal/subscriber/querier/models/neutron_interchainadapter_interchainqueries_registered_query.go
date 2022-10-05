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

// NeutronInterchainadapterInterchainqueriesRegisteredQuery neutron interchainadapter interchainqueries registered query
//
// swagger:model neutron.interchainadapter.interchainqueries.RegisteredQuery
type NeutronInterchainadapterInterchainqueriesRegisteredQuery struct {

	// The IBC connection ID for getting ConsensusState to verify proofs
	ConnectionID string `json:"connection_id,omitempty"`

	// The unique id of the registered query.
	ID string `json:"id,omitempty"`

	// The KV-storage keys for which we want to get values from remote chain
	Keys []*NeutronInterchainadapterInterchainqueriesRegisteredQueryKeysItems0 `json:"keys"`

	// The local chain last block height when the query result was updated.
	LastSubmittedResultLocalHeight string `json:"last_submitted_result_local_height,omitempty"`

	// The remote chain last block height when the query result was updated.
	LastSubmittedResultRemoteHeight string `json:"last_submitted_result_remote_height,omitempty"`

	// The address that registered the query.
	Owner string `json:"owner,omitempty"`

	// The query type identifier: `kv` or `tx` now
	QueryType string `json:"query_type,omitempty"`

	// The filter for transaction search ICQ
	TransactionsFilter string `json:"transactions_filter,omitempty"`

	// Parameter that defines how often the query must be updated.
	UpdatePeriod string `json:"update_period,omitempty"`
}

// Validate validates this neutron interchainadapter interchainqueries registered query
func (m *NeutronInterchainadapterInterchainqueriesRegisteredQuery) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateKeys(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *NeutronInterchainadapterInterchainqueriesRegisteredQuery) validateKeys(formats strfmt.Registry) error {
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
					return ve.ValidateName("keys" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// ContextValidate validate this neutron interchainadapter interchainqueries registered query based on the context it is used
func (m *NeutronInterchainadapterInterchainqueriesRegisteredQuery) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidateKeys(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *NeutronInterchainadapterInterchainqueriesRegisteredQuery) contextValidateKeys(ctx context.Context, formats strfmt.Registry) error {

	for i := 0; i < len(m.Keys); i++ {

		if m.Keys[i] != nil {
			if err := m.Keys[i].ContextValidate(ctx, formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("keys" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// MarshalBinary interface implementation
func (m *NeutronInterchainadapterInterchainqueriesRegisteredQuery) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *NeutronInterchainadapterInterchainqueriesRegisteredQuery) UnmarshalBinary(b []byte) error {
	var res NeutronInterchainadapterInterchainqueriesRegisteredQuery
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// NeutronInterchainadapterInterchainqueriesRegisteredQueryKeysItems0 neutron interchainadapter interchainqueries registered query keys items0
//
// swagger:model NeutronInterchainadapterInterchainqueriesRegisteredQueryKeysItems0
type NeutronInterchainadapterInterchainqueriesRegisteredQueryKeysItems0 struct {

	// Key you want to read from the storage
	// Format: byte
	Key strfmt.Base64 `json:"key,omitempty"`

	// Path (storage prefix) to the storage where you want to read value by key (usually name of cosmos-sdk module: 'staking', 'bank', etc.)
	Path string `json:"path,omitempty"`
}

// Validate validates this neutron interchainadapter interchainqueries registered query keys items0
func (m *NeutronInterchainadapterInterchainqueriesRegisteredQueryKeysItems0) Validate(formats strfmt.Registry) error {
	return nil
}

// ContextValidate validates this neutron interchainadapter interchainqueries registered query keys items0 based on context it is used
func (m *NeutronInterchainadapterInterchainqueriesRegisteredQueryKeysItems0) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *NeutronInterchainadapterInterchainqueriesRegisteredQueryKeysItems0) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *NeutronInterchainadapterInterchainqueriesRegisteredQueryKeysItems0) UnmarshalBinary(b []byte) error {
	var res NeutronInterchainadapterInterchainqueriesRegisteredQueryKeysItems0
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}