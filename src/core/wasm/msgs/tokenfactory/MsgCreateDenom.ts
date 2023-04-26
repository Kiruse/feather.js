import { JSONSerializable } from '../../../../util/json';
import { AccAddress, ValAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCreateDenom as MsgCreateDenom_pb } from '@terra-money/terra.proto/cosmwasm/tokenfactory/v1beta1/tx';

/**
 * A delegator can submit this message to send more alliance assets
 * to be staked through the alliance module in a validator.
 */
export class MsgCreateDenom extends JSONSerializable<
  MsgCreateDenom.Amino,
  MsgCreateDenom.Data,
  MsgCreateDenom.Proto
> {
  /**
   *
   * @param delegatorAddress delegator's account address
   * @param validatorAddress validator's operator address
   * @param amount amount of alliance assets to be sent for delegation
   */
  constructor(public sender: AccAddress, public subdenom: string) {
    super();
  }

  public toAmino(_?: boolean): MsgCreateDenom.Amino {
    _;
    const { sender, subdenom } = this;

    return {
      type: 'osmosis/tokenfactory/create-denom',
      value: {
        sender,
        subdenom,
      },
    };
  }

  public static fromProto(
    proto: MsgCreateDenom.Proto,
    _?: boolean
  ): MsgCreateDenom {
    _;
    return new MsgCreateDenom(proto.sender, proto.subdenom);
  }

  public toProto(_?: boolean): MsgCreateDenom.Proto {
    _;
    const { sender, subdenom } = this;
    return MsgCreateDenom_pb.fromPartial({
      sender,
      subdenom,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/cosmwasm.tokenfactory.v1beta1.MsgCreateDenom',
      value: MsgCreateDenom_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgCreateDenom {
    _;
    return MsgCreateDenom.fromProto(MsgCreateDenom_pb.decode(msgAny.value));
  }

  public static fromData(
    data: MsgCreateDenom.Data,
    _?: boolean
  ): MsgCreateDenom {
    _;
    const { sender, subdenom } = data;
    return new MsgCreateDenom(sender, subdenom);
  }

  public toData(_?: boolean): MsgCreateDenom.Data {
    _;
    const { sender, subdenom } = this;
    return {
      '@type': '/cosmwasm.tokenfactory.v1beta1.MsgCreateDenom',
      sender,
      subdenom,
    };
  }

  public static fromAmino(data: MsgCreateDenom.Amino): MsgCreateDenom {
    const {
      value: { sender, subdenom },
    } = data;

    return new MsgCreateDenom(sender, subdenom);
  }
}

export namespace MsgCreateDenom {
  export interface Amino {
    type: 'osmosis/tokenfactory/create-denom';
    value: {
      sender: AccAddress;
      subdenom: string;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.tokenfactory.v1beta1.MsgCreateDenom';
    sender: AccAddress;
    subdenom: string;
  }

  export type Proto = MsgCreateDenom_pb;
}
