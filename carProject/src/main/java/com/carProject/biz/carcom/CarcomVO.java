package com.carProject.biz.carcom;

public class CarcomVO {
	private int seq;
	private String carnum;
	private String carname;
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getCarnum() {
		return carnum;
	}
	public void setCarnum(String carnum) {
		this.carnum = carnum;
	}
	public String getCarname() {
		return carname;
	}
	public void setCarname(String carname) {
		this.carname = carname;
	}
	@Override
	public String toString() {
		return "CarcomVO [seq=" + seq + ", carnum=" + carnum + ", carname=" + carname + "]";
	}
}
