package com.carProject.biz.car;




public class CarVO {
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
		return "CarVO [seq=" + seq + ", carnum=" + carnum + ", carname=" + carname + "]";
	}

	
	

}