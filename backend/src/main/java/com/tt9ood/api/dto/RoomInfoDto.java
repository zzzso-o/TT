package com.tt9ood.api.dto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel("RoomInfoDto")
public class RoomInfoDto {

    private long gmUserCode;
    private long py1Code;
    private long py2Code;
    private long py3Code;
    private long py4Code;
    private long py5Code;

    public RoomInfoDto(long gmUserCode, long py1Code, long py2Code, long py3Code, long py4Code, long py5Code) {
        this.gmUserCode = gmUserCode;
        this.py1Code = py1Code;
        this.py2Code = py2Code;
        this.py3Code = py3Code;
        this.py4Code = py4Code;
        this.py5Code = py5Code;
    }
}
