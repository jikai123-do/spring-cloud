package com.iotek.orderservice.domain;

public class Address {

    private String houseNum;
    private String street;
    private String district;
    private String  city;


    public Address(String houseNum, String street, String district, String city) {
        this.houseNum = houseNum;
        this.street = street;
        this.district = district;
        this.city = city;
    }


    public Address(){


    }
    public String getHouseNum() {
        return houseNum;
    }

    public void setHouseNum(String houseNum) {
        this.houseNum = houseNum;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
